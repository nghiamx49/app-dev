const CoursesService = {
  getAllCourses: async () => {
    try {
      let response = await fetch("http://localhost:5000/api/home/courses");
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getCourseDetail: async (courseId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/api/home/courses/detail/${courseId}`
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
        `http://localhost:5000/api/home/courses/create/`,
        {
          method: "POST",
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
        `http://localhost:5000/api/home/courses/edit/${courseId}`,
        {
          method: "PUT",
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
        `http://localhost:5000/api/home/courses/delete/${courseId}`,
        {
          method: "DELETE",
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
