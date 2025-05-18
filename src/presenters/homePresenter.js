export class HomePresenter {
    constructor(view, contentAPI) {
      this.view = view;
      this.contentAPI = contentAPI;
    }
  
    async loadHomeData() {
      try {
        this.view.setLoading(true);
        const response = await this.contentAPI.getHome();
  
        this.view.setHomeData({
          sliders: Array.isArray(response.data?.sliders) ? response.data.sliders : [],
          articles: Array.isArray(response.data?.articles) ? response.data.articles : [],
        });
  
        this.view.setError(null);
      } catch (err) {
        this.view.setError(`Failed to load data: ${err.message || 'Unknown error'}`);
      } finally {
        this.view.setLoading(false);
      }
    }
  }
  