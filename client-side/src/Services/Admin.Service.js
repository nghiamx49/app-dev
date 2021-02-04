const AdminService = {
  allTrainer: async () => {
    try {
      let response = await fetch("/api/admin/trainer");
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  trainerDetail: async (trainerId) => {
    try {
      let response = await fetch(`/api/admin/trainer/detail/${trainerId}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  trainerCreate: async (trainer) => {
    try {
      let response = await fetch("/api/admin/trainer/create", {
        method: "POST",
        body: JSON.stringify(trainer),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  trainerEdit: async (trainerId, trainer) => {
    try {
      let response = await fetch(`/api/admin/trainer/edit/${trainerId}`, {
        method: "PUT",
        body: JSON.stringify(trainer),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  trainerDelete: async (trainerId) => {
    try {
      let response = await fetch(`/api/admin/trainer/delete/${trainerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  trainerChangePass: async (trainerId, changePassword) => {
    try {
      let response = await fetch(
        `/api/admin/trainer/changepassword/${trainerId}`,
        {
          method: "PUT",
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
      let response = await fetch("/api/admin/staff");
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  staffDetail: async (staffId) => {
    try {
      let response = await fetch(`/api/admin/staff/detail/${staffId}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  staffCreate: async (staff) => {
    try {
      let response = await fetch("/api/admin/staff/create", {
        method: "POST",
        body: JSON.stringify(staff),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  staffEdit: async (staffId, staff) => {
    try {
      let response = await fetch(`/api/admin/staff/edit/${staffId}`, {
        method: "PUT",
        body: JSON.stringify(staff),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  staffDelete: async (staffId) => {
    try {
      let response = await fetch(`/api/admin/staff/delete/${staffId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  staffChangePass: async (staffId, passwordObj) => {
    try {
      let response = await fetch(`/api/admin/staff/changepassword/${staffId}`, {
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
      console.log(error);
    }
  },
};

export default AdminService;
