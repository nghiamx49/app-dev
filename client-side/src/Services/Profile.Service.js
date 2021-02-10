const ProfileService = {
  getOwnRelatedCourses: async (userId) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/profile/${userId}/relatedcourses`,
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
  getDetailOwnRelatedCourse: async (userId, itemId) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/profile/${userId}/relatedcourses/detail/${itemId}`,
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console(error);
    }
  },
  getProfileDetail: async (userId) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/profile/${userId}`,
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
  editProfile: async (userId, updateObj) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/profile/edit/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(updateObj),
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
  changeProfilePassword: async (userId, passwordObj) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/profile/changepassword/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(passwordObj),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log();
    }
  },
};

export default ProfileService;
