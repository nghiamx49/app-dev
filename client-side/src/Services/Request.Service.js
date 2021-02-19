const RequestService = {
  getAllRequest: async () => {
    try {
      let response = await fetch("http://localhost:5000/api/home/requests/", {
        credentials: "include",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  allowRequest: async (requestId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/api/home/requests/allow/${requestId}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  rejectRequest: async (requestId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/api/home/requests/reject/${requestId}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  makeRequest: async (request) => {
    try {
      let response = await fetch(
        `http://localhost:5000/api/home/requests/join`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default RequestService;
