const CoursesService = {
  getAllCourses: async () => {
    try {
      let response = await fetch(
        "http://localhost:5000/home/courses",
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getCourseDetail: async (courseId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/courses/detail/${courseId}`,
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  createCourse: async (course) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/courses/create/`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(course),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  editCourse: async (courseId, course) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/courses/edit/${courseId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(course),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCourse: async (courseId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/courses/delete/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default CoursesService;
