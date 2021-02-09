const TraineeRelatedCourses = {
  getAllReatedCourses: async (trainerId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/profile/${trainerId}/relatedcourses`,
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
  getRelatedCourseDetail: async (userId, itemId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/profile/${userId}/relatedcourses/detail/${itemId}`,
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
  getDataSelection: async (userId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/profile/${userId}/relatedcourses/dataoptional`,
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
  assignNewCourse: async (userId, relatedCourse) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/profile/${userId}/relatedcourses/assign`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(relatedCourse),
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
  changeAssignedCourse: async (userId, itemId, relatedCourse) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/profile/${userId}/relatedcourses/change/${itemId}`,
        {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify(relatedCourse),
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
  removeAssignedCourse: async (userId, itemId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/profile/${userId}/relatedcourses/remove/${itemId}`,
        {
          credentials: "include",
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

export default TraineeRelatedCourses;
