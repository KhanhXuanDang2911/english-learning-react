const teachers = [
  {
    name: "Nguyễn Văn An",
    title: "Giảng viên tiếng Anh giao tiếp",
    bio: "Hơn 10 năm kinh nghiệm giảng dạy tại các trung tâm Anh ngữ hàng đầu Việt Nam.",
    imageUrl:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Emma Smith",
    title: "Giáo viên bản ngữ (Mỹ)",
    bio: "Chuyên gia phát âm và luyện phản xạ giao tiếp cho người học tiếng Anh như ngôn ngữ thứ hai.",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Trần Văn Tùng",
    title: "Giảng viên luyện thi IELTS",
    bio: "Đạt IELTS 8.5, từng là trưởng nhóm giảng viên tại trung tâm ACET.",
    imageUrl:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "James Anderson",
    title: "Giáo viên bản ngữ (Anh)",
    bio: "Tốt nghiệp ngành Ngôn ngữ học tại Đại học Oxford, giảng dạy tiếng Anh học thuật hơn 5 năm.",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Lê Hoàng Minh",
    title: "Giảng viên tiếng Anh cho người đi làm",
    bio: "Tư vấn và đào tạo tiếng Anh doanh nghiệp cho các công ty công nghệ lớn.",
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Sarah Nguyen",
    title: "Giảng viên tiếng Anh trẻ em",
    bio: "Đào tạo tiếng Anh cho trẻ từ 6–12 tuổi với phương pháp học qua trò chơi.",
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Quân Nguyễn",
    title: "Chuyên gia tư vấn học tập",
    bio: "Hướng dẫn lộ trình học tiếng Anh hiệu quả cho từng trình độ học viên.",
    imageUrl:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Mark Johnson",
    title: "Giáo viên bản ngữ (Úc)",
    bio: "Nhiều năm kinh nghiệm giảng dạy tiếng Anh thương mại tại châu Á.",
    imageUrl:
      "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const OurTeachers = () => {
  return (
    <div className="main-layout">
      <div className="flex flex-col justify-center py-8 sm:pt-12 sm:pb-20 px-6 lg:px-8 max-w-screen-xl mx-auto">
        <b className="text-muted-foreground font-semibold">
          Đội ngũ giảng viên
        </b>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter text-primary-color">
          Gặp gỡ những người sẽ đồng hành cùng bạn
        </h2>
        <p className="mt-4 text-base sm:text-lg">
          Chúng tôi là đội ngũ giảng viên trong và ngoài nước, luôn sẵn sàng hỗ
          trợ bạn trong hành trình chinh phục tiếng Anh!
        </p>

        <div className="mt-14 sm:mt-20 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.name}>
              <img
                src={teacher.imageUrl}
                alt={teacher.name}
                className="h-20 w-20 rounded-full object-cover bg-secondary"
                width={80}
                height={80}
                loading="lazy"
              />
              <h3 className="mt-4 text-lg font-semibold text-primary-color">
                {teacher.name}
              </h3>
              <p className="text-muted-foreground text-sm">{teacher.title}</p>
              <p className="mt-3 text-sm">{teacher.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeachers;
