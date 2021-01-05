(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.buildUI();
      // this.scrollToTop()
      this.fetchJSONS();
    },
    cacheElements() {
      this.$artAndExhlist = document.querySelector('.art-exh_list');
      this.$artAndExhlistOnHomePage = document.querySelector('.hp-art-exhibitons--list');
      this.$atelierOnHomePage = document.querySelector('.hp-atelier--list');
      this.$footerGalery = document.querySelector('.footer-galery-list');
      this.$atelierImagesList = document.querySelector('.atelier_list');
      this.$pressImagesList = document.querySelector('.press_list');
    },
    buildUI() {
    },
    // scrollToTop(){
    //   let toTopButton = document.getElementById("toTop");
    //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //     mybutton.style.display = "block";
    //   } else {
    //     mybutton.style.display = "none";
    //   }
    //     document.body.scrollTop = 0; // For Safari
    //     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // },
    async fetchJSONS(){
      if (this.$artAndExhlist || this.$artAndExhlistOnHomePage) {
        const artAPI = new ArtJson();
        const artJSON = await artAPI.createLineUpForArtJson();
        this.artJsonFile = artJSON
        this.createHTMLForFlowerLineUp(artJSON);
      }
      if (this.$atelierImagesList || this.$atelierOnHomePage) {
        const AtelierJsonFile = new AtelierJson()
        const AtelierJSONFile = await AtelierJsonFile.createLineUpForAtelier();
        this.createHTMLfromJSON(AtelierJSONFile)
        }
      if (this.$pressImagesList) {
        const PressJsonFile = new PressJson();
        const PressJSONFile = await PressJsonFile.createLineUpForPressJson();
        this.createHTMLfromJSON(PressJSONFile)
        }
    },
    createHTMLForFlowerLineUp(data) {
      if (this.$artAndExhlist) {
         let tempStr = "";
        data.slice(0, 10).map(art => {
        let allImages = art.images.map((img, index) => {
          return `<img loading="lazy" src="../media/images/${img}">`
        }).join('')
         tempStr +=`<li>
        <h2>${art.title}</h2>
        <h3>${art.subtitle}</h3>
        <p>${art.location}</p>
        ${allImages}
        </li>`
        return this.$artAndExhlist.innerHTML = tempStr
      })
      }
     if (this.$artAndExhlistOnHomePage) {
      let tempStr = "";
        data.map(art => {
          if (art.highlight === true) {
        tempStr +=`<li>
        <img  loading="lazy" src="media/images/${art.cover}">
        <p>${art.location !== null ? art.location : ''}</p>
        <h2>${art.title}</h2>
        <h3>${art.subtitle}</h3>
        </li>`
      }
      return this.$artAndExhlistOnHomePage.innerHTML = tempStr
      })
     }

      
    },
    createHTMLfromJSON(data) {
      let tempStr = '';
      console.log(data)
      data.map(item => {
        tempStr += `
        <li>
        <img src="${item.image !== undefined ? item.image : ""}">
        <h3>${item.title_short !== undefined ? item.title_short : item}</h3>
        <h2>${item.title !== undefined ? item.title : item}</h2>
        <p>${item.description !== undefined ? item.description : item}</p>
        <p><a href=""><span class="learn-more">Learn more</span></a></p>
        </li>
        `
      })
      if (this.$atelierImagesList) {
        this.$atelierImagesList.innerHTML = tempStr
      } else if (this.$pressImagesList){
        this.$pressImagesList.innerHTML = tempStr
      };
      if (this.$atelierOnHomePage) {
        data.slice(0, 3).map(item => {
          let tempStr = '';
          tempStr += `
          <li>
          <img loading="lazy" src="${item.image !== undefined ? item.image : ""}">
          <h3>${item.title_short !== undefined ? item.title_short : item}</h3>
          <h2>${item.title !== undefined ? item.title : item}</h2>
          <p>${item.description !== undefined ? item.description : item}</p>
          <p><a href=""><span class="learn-more">Learn more</span></a></p>
          </li>
          `
          this.$atelierOnHomePage.innerHTML += tempStr
        })
        this.artJsonFile.slice(4, 9).map(item => {
          let tempStr = '';
          tempStr += `
          <li><img  loading="lazy" src="media/images/${item.images[0]}"></li>`
          this.$footerGalery.innerHTML += tempStr  
        })
      }
    }
  }
  app.initialize();
})();