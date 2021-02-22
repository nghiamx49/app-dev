const AdminService = {
  allTrainer: async () => {
    try {
      let response = await fetch("http://tam-application.studio/api/admin/trainer", {
        credentials: "include",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  trainerDetail: async (trainerId) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/trainer/detail/${trainerId}`,
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
  trainerCreate: async (trainer) => {
    try {
      let response = await fetch(
        "http://tam-application.studio/api/admin/trainer/create",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(trainer),
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
  trainerEdit: async (trainerId, trainer) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/trainer/edit/${trainerId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(trainer),
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
  trainerDelete: async (trainerId) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/trainer/delete/${trainerId}`,
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
  trainerChangePass: async (trainerId, changePassword) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/trainer/changepassword/${trainerId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changePassword),
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  allStaff: async () => {
    try {
      let response = await fetch("http://tam-application.studio/api/admin/staff", {
        credentials: "include",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  staffDetail: async (staffId) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/staff/detail/${staffId}`,
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
  staffCreate: async (staff) => {
    try {
      let response = await fetch(
        "http://tam-application.studio/api/admin/staff/create",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(staff),
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
  staffEdit: async (staffId, staff) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/staff/edit/${staffId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(staff),
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
  staffDelete: async (staffId) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/staff/delete/${staffId}`,
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
  staffChangePass: async (staffId, passwordObj) => {
    try {
      let response = await fetch(
        `http://tam-application.studio/api/admin/staff/changepassword/${staffId}`,
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
      console.log(error);
    }
  },
};

export default AdminService;
