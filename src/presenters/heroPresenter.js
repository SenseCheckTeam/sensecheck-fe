const heroPresenter = {
    load(response, setData) {
      if (response && Array.isArray(response.data)) {
        setData(response.data); // Set array hero
      } else {
        setData([]);
      }
    },
  };
  
  export default heroPresenter;
  