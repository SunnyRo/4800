    constructor() {
        super();
        this.state = {
            storeID: "",
            name: "",
            address: "",
            phone: "",
            item: [],
            isLoaded: false,
            photo:
                "https://1000logos.net/wp-content/uploads/2017/05/Walmart-logo.png",
        };
        this.logout = this.logout.bind(this);
        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.getStore = this.getStore.bind(this);
    }