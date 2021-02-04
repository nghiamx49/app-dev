const ProfileService = {
  getOwnRelatedCourses: async (userId) => {
    try {
      let response = await fetch(`/profile/${userId}/relatedcourses`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getDetailOwnRelatedCourse: async (userId, itemId) => {
    try {
      let response = await fetch(
        `/profile/${userId}/relatedcourses/detail/${itemId}`
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getProfileDetail: async (userId) => {
    try {
      let response = await fetch(`/profile/${userId}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  changeProfilePassword: async (userId, passwordObj) => {
    try {
      let response = await fetch(`/profile/changepassword/${userId}`, {
        method: "PUT",
        body: JSON.stringify(passwordObj),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log();
    }
  },
};

export default ProfileService;
