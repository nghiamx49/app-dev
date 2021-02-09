const TraineeManager = {
  getAllTrainee: async () => {
    try {
      let response = await fetch(
        "http://localhost:5000/home/trainees",
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
  getOptional: async () => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/programmingoptional`,
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
  getTraineeDetail: async (traineeId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/profile/${traineeId}`,
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
  changeTraineePassword: async (traineeId, passwordObj) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/changepassword/${traineeId}`,
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
  createNewTrainee: async (traineeObj) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/create`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(traineeObj),
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
  editTraineeAccount: async (traineeId, traineeObj) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/edit/${traineeId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(traineeObj),
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
  deleteTraineeAccount: async (traineeId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/home/trainees/delete/${traineeId}`,
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

export default TraineeManager;
