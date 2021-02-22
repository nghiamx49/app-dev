const TrainerManager = {
  getAllTrainer: async () => {
    try {
      let reponse = await fetch(
        "http://tam-application/api/home/trainers",
        {
          credentials: "include",
        }
      );
      let data = await reponse.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getTrainerDetail: async (trainerId) => {
    try {
      let response = await fetch(
        `http://tam-application/api/home/trainers/profile/${trainerId}`,
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
  editTrainerProfile: async (trainerId, trainer) => {
    try {
      let response = await fetch(
        `http://tam-application/api/home/trainers/profile/${trainerId}`,
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
};

export default TrainerManager;
