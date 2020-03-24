
//Create new app
var app = new Vue({
	el:'#app',
	data:{
		loading:true,
		lat:'',
		lon:'',
		location:'',
		temp:'',
		humidity:'',
		feelslike:'',
		city:'',
	},
	
	// Geographic coordinates
	created() {
		navigator.geolocation.getCurrentPosition(pos => {
			console.log('got coordinates', pos.coords);
			this.lat = pos.coords.latitude;
			this.lon = pos.coords.longitude;
			this.loadWeather();
		});
	},

	//Search by city name
	methods:{
		search() {
			console.log(this.city);
			axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=ddd04e5b4ff1b5ec144e29e84e52aef2`)
				.then(res => {
					let weather = res.data;
					console.log('response',weather);

					this.location = weather.name;
					this.country = weather.sys.country;
					this.temp = Math.floor(weather.main.temp);
					this.wind = weather.wind.speed;
					this.feelslike = weather.main.feels_like;
					this.humidity = weather.main.humidity + '%';
					this.desc = weather.weather[0].description;
					this.loading = false;
					
				})
				.catch(error => {
					alert('Incorrect city name!')
				});
		},
		// Search by geographic coordinates
		loadWeather() {
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=ddd04e5b4ff1b5ec144e29e84e52aef2`)
			.then(res => {
				let weather = res.data;
				console.log('response',weather);
				
				this.location = weather.name;
				this.country = weather.sys.country;
				this.temp = Math.floor(weather.main.temp);
				this.wind = weather.wind.speed;
				this.feelslike = weather.main.feels_like;
				this.humidity = weather.main.humidity + '%';
                this.desc = weather.weather[0].description;
				this.loading = false;
				
			})
			.catch(error => {
				alert('Location information did not load correctly')
			});
				
        }
	}

});
