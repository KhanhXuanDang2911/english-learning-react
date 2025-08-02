import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Eye, Upload } from "lucide-react"

interface CourseFormData {
  title: string
  slug: string
  description: string
  shortDescription: string
  category: string
  level: string
  language: string
  price: string
  discountPrice: string
  status: string
  featured: boolean
  requirements: string
  whatYouWillLearn: string
  tags: string
  thumbnail: string
  previewVideo: string
  duration: string
  maxStudents: string
}

export default function CreateCourse() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    category: "",
    level: "Beginner",
    language: "English",
    price: "",
    discountPrice: "",
    status: "Draft",
    featured: false,
    requirements: "",
    whatYouWillLearn: "",
    tags: "",
    thumbnail: "",
    previewVideo: "",
    duration: "",
    maxStudents: "",
  })

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    setFormData((prev) => ({
      ...prev,
      title,
      slug,
    }))
  }

  const handleSave = (status: string) => {
    const dataToSave = { ...formData, status }
    console.log("Saving course:", dataToSave)
    navigate("/admin/courses")
  }

  const handlePreview = () => {
    console.log("Preview course:", formData)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{isEdit ? "Edit Course" : "Create New Course"}</h2>
            <p className="text-muted-foreground">
              {isEdit ? "Update your course details" : "Create a new online course"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" onClick={() => handleSave("Draft")}>
            Save Draft
          </Button>
          <Button className="bg-[#155e94] hover:bg-[#0b4674]" onClick={() => handleSave("Published")}>
            <Save className="mr-2 h-4 w-4" />
            {isEdit ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details about your course.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="Enter course title..."
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Course Slug</Label>
                <Input
                  id="slug"
                  placeholder="course-url-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  placeholder="Brief description of the course..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed course description..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="10"
                    value={formData.duration}
                    onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    placeholder="100"
                    value={formData.maxStudents}
                    onChange={(e) => setFormData((prev) => ({ ...prev, maxStudents: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Define what students will learn and course requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatYouWillLearn">What You Will Learn</Label>
                <Textarea
                  id="whatYouWillLearn"
                  placeholder="List the key learning outcomes (one per line)"
                  value={formData.whatYouWillLearn}
                  onChange={(e) => setFormData((prev) => ({ ...prev, whatYouWillLearn: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="List course prerequisites (one per line)"
                  value={formData.requirements}
                  onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="javascript, react, frontend"
                  value={formData.tags}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">Separate tags with commas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Upload course thumbnail and preview video.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Course Thumbnail</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">PNG, JPG up to 2MB (1280x720 recommended)</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previewVideo">Preview Video URL</Label>
                <Input
                  id="previewVideo"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.previewVideo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, previewVideo: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
              <CardDescription>Configure course visibility and categorization.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Under Review</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Language">Language</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured Course</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Set the course price and discount options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="99.99"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPrice">Discount Price ($)</Label>
                <Input
                  id="discountPrice"
                  type="number"
                  placeholder="79.99"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData((prev) => ({ ...prev, discountPrice: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">Leave empty if no discount</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
              <CardDescription>Control when and how your course is published.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  Status: <span className="font-medium">{formData.status}</span>
                </p>
                <p>
                  Visibility: <span className="font-medium">Public</span>
                </p>
                <p>
                  Publish: <span className="font-medium">Immediately</span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" onClick={() => handleSave("Draft")} className="w-full">
                  Save Draft
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSave("Published")}
                  className="w-full bg-[#155e94] hover:bg-[#0b4674]"
                >
                  {isEdit ? "Update Course" : "Publish Course"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
