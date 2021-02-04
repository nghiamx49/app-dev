const TraineeManager = {
  getAllTrainee: async () => {
    try {
      let response = await fetch("http://localhost:5000/api/home/trainees");
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getOptional: async () => {
    try {
      let response = await fetch(
        `http://localhost:5000/api/home/trainees/programmingoptional`
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
        `http://localhost:5000/api/home/trainees/profile/${traineeId}`
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
        `http://localhost:5000/api/home/trainees/changepassword/${traineeId}`,
        {
          method: "PUT",
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
        `http://localhost:5000/api/home/trainees/create`,
        {
          method: "POST",
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
        `http://localhost:5000/api/home/trainees/edit/${traineeId}`,
        {
          method: "PUT",
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
        `http://localhost:5000/api/home/trainees/delete/${traineeId}`,
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

export default TraineeManager;
