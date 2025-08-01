"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Rewind, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AudioPlayerProps {
  src: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number) => void; // Added for external time tracking
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  setPlaybackRate: (rate: number) => void;
  toggleLoop: () => void;
}

const AudioPlayer = React.forwardRef<AudioPlayerRef, AudioPlayerProps>(
  (
    {
      src,
      className,
      onPlay,
      onPause,
      onEnded,
      autoPlay = false,
      onTimeUpdate,
    },
    ref
  ) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(0.5);
    const [isMuted, setIsMuted] = React.useState(false);
    const [playbackRate, setPlaybackRateState] = React.useState(1.0);
    const [loop, setLoopState] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
      play: () => {
        audioRef.current?.play();
      },
      pause: () => {
        audioRef.current?.pause();
      },
      seekTo: (time: number) => {
        if (audioRef.current) {
          audioRef.current.currentTime = time;
        }
      },
      setVolume: (vol: number) => {
        if (audioRef.current) {
          audioRef.current.volume = vol;
          setVolume(vol);
          setIsMuted(vol === 0);
        }
      },
      getDuration: () => audioRef.current?.duration || 0,
      getCurrentTime: () => audioRef.current?.currentTime || 0,
      setPlaybackRate: (rate: number) => {
        if (audioRef.current) {
          audioRef.current.playbackRate = rate;
          setPlaybackRateState(rate);
        }
      },
      toggleLoop: () => {
        if (audioRef.current) {
          audioRef.current.loop = !audioRef.current.loop;
          setLoopState(audioRef.current.loop);
        }
      },
    }));

    // Synchronize playbackRate and loop with the DOM element [^1][^3]
    React.useEffect(() => {
      if (audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
      }
    }, [playbackRate]);

    React.useEffect(() => {
      if (audioRef.current) {
        audioRef.current.loop = loop;
      }
    }, [loop]);

    const togglePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          onPause?.();
        } else {
          audioRef.current.play();
          onPlay?.();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        onTimeUpdate?.(audioRef.current.currentTime); // Pass current time to parent
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
        audioRef.current.volume = volume; // Set initial volume
        if (autoPlay) {
          audioRef.current
            .play()
            .catch((e) => console.error("Autoplay failed:", e));
        }
      }
    };

    const handleProgressChange = (value: number[]) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value[0];
        setCurrentTime(value[0]);
      }
    };

    const toggleMute = () => {
      if (audioRef.current) {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
        if (!isMuted && volume === 0) {
          setVolume(0.5); // Restore default volume if muted when volume was 0
          audioRef.current.volume = 0.5;
        }
      }
    };

    const handleVolumeChange = (value: number[]) => {
      if (audioRef.current) {
        const newVolume = value[0] / 100;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
      }
    };

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handlePlaybackRateChange = (rate: number) => {
      if (audioRef.current) {
        audioRef.current.playbackRate = rate;
        setPlaybackRateState(rate);
      }
    };

    const handleLoopToggle = () => {
      if (audioRef.current) {
        audioRef.current.loop = !audioRef.current.loop;
        setLoopState(audioRef.current.loop);
      }
    };

    const handleRewind = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(
          0,
          audioRef.current.currentTime - 3
        ); // Rewind 3 seconds
      }
    };

    return (
      <div
        className={cn(
          "relative w-full bg-gray-900 rounded-lg overflow-hidden p-4",
          className
        )}
      >
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          preload="metadata"
        />

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
            <span className="sr-only">{isPlaying ? "Tạm dừng" : "Phát"}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRewind}
            className="text-white hover:bg-white/20"
          >
            <Rewind className="h-6 w-6" />
            <span className="sr-only">Tua lại 3 giây</span>
          </Button>

          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleProgressChange}
            className="flex-grow cursor-pointer [&_[data-orientation=horizontal]]:bg-white/30 [&_[data-orientation=horizontal]_span]:bg-[#155e94] [&_[role=slider]]:border-[#155e94] [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-lg"
          />

          <div className="text-white text-sm font-medium min-w-[80px] text-right">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                {playbackRate}x<span className="sr-only">Tốc độ phát</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24">
              {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                <DropdownMenuItem
                  key={rate}
                  onClick={() => handlePlaybackRateChange(rate)}
                >
                  {rate}x
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLoopToggle}
            className={cn(
              "text-white hover:bg-white/20",
              loop && "bg-[#155e94]/30 text-[#155e94]"
            )}
          >
            <Repeat className="h-6 w-6" />
            <span className="sr-only">Lặp lại</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-white hover:bg-white/20"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
            <span className="sr-only">
              {isMuted ? "Tắt tiếng" : "Bật tiếng"}
            </span>
          </Button>
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-24 cursor-pointer [&_[data-orientation=horizontal]]:bg-white/30 [&_[data-orientation=horizontal]_span]:bg-[#155e94] [&_[role=slider]]:border-[#155e94] [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-lg"
          />
        </div>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
