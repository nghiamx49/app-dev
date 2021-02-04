const TrainerManager = {
  getAllTrainer: async () => {
    try {
      let reponse = await fetch("/home/trainers");
      let data = await reponse.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getTrainerDetail: async (trainerId) => {
    try {
      let response = await fetch(`/home/trainers/profile/${trainerId}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  editTrainerProfile: async (trainerId, trainer) => {
    try {
      let response = await fetch(`/home/trainers/profile/${trainerId}`, {
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
};

export default TrainerManager;
