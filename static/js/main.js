(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.buildUI();
      // this.scrollToTop()
      this.fetchJSONS();
    },
    cacheElements() {
      this.$artAndExhHeader = document.querySelector('.art-exh--header')
      this.$artAndExhCategoriesList = document.querySelector('.art-exh-categories')
      this.$artAndExhYearsList = document.querySelector('.art-exh-years')
      this.$artAndExhlist = document.querySelector('.art-exh--list');
      this.$artAndExhlistOnHomePage = document.querySelector('.hp-art-exhibitons--list');
      this.$atelierOnHomePage = document.querySelector('.hp-atelier--list');
      this.$footerGalery = document.querySelector('.footer-galery-list');
      this.$atelierImagesList = document.querySelector('.atelier-list');
      this.$pressImagesList = document.querySelector('.press-images')
      this.$pressListIn = document.querySelector('.press-list-In');
      this.$pressListRelease = document.querySelector('.press-list-Release');
    },
    buildUI() {
      if (this.$artAndExhHeader) {
        this.createHTMLforArtAndExhibitionsHeader()
      }
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
    async fetchJSONS() {
      if (this.$artAndExhlist || this.$artAndExhlistOnHomePage) {
        const artAPI = new ArtJson();
        const artJSON = await artAPI.createLineUpForArtJson();
        this.artJsonFile = artJSON
        this.createHTMLForArtLineUp(artJSON);
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
    createHTMLForArtLineUp(data) {
      if (this.$artAndExhlist) {
        let mapEvents = years.map(year => {
          const filterTroughEvents = data.filter(art => {
            return art.year.indexOf(year) > -1;
          });
          console.log(filterTroughEvents)
          let filterdEvents = filterTroughEvents.slice(0, 4).map(item =>{
            let allImages = item.images.map((img, index) => {
            return `<img class="lazy" loading="lazy" src="../media/images/${img}" alt="...">`
            }).join('')
            return `
            <div class="art-exh--lineUp--block">
            <section class="art-exh--lineUp--inner">
            <h3>${item.title !== null ? item.title : ""}</h3>
            <h4>${item.subtitle !== null ? item.subtitle : ""}</h4>
            <p>${item.location !== null ? item.location : ""}</p>
            </section>
            <section class="art-exh--lineUp--images">
            ${allImages}
            </section>
            </div>`
          }).join('')
          return `
          <li>
          <h2 id="${year}">${year}</h2>
          ${filterdEvents}
          </li>`
        }).join('')
        return this.$artAndExhlist.innerHTML = mapEvents
      };
      if (this.$artAndExhlistOnHomePage) {
        let tempStr = "";
        let filterdObjects = data.filter(I => I.highlight === true)
        filterdObjects.map(art => {
            tempStr += `<li>
        <img  loading="lazy" data-src="media/images/${art.cover}">
        <p>${art.location !== null ? art.location : ''}</p>
        <h2>${art.title}</h2>
        <h3>${art.subtitle}</h3>
        </li>`
          return this.$artAndExhlistOnHomePage.innerHTML = tempStr
        })
      }


    },
    createHTMLfromJSON(data) {
      data.map(item => {
        let tempStr = `
        <li>
        <img src="${item.image !== undefined ? item.image : ""}">
        <h3>${item.title_short !== undefined ? item.title_short : item}</h3>
        <h2>${item.title !== undefined ? item.title : item}</h2>
        <p>${item.description !== undefined ? item.description : item}</p>
        <p><a href=""><span class="learn-more">Learn more</span></a></p>
        </li>
        `
        if (item.type === "Press release") {
          return this.$pressListRelease.innerHTML += tempStr
        } else if(item.type === "In the press"){
          return this.$pressListIn.innerHTML += tempStr
        };
      });
      if (this.$atelierImagesList) {
        return this.$atelierImagesList.innerHTML = tempStr
      };
      if (this.$atelierOnHomePage) {
        data.slice(0, 3).map(item => {
          let tempStr = '';
          tempStr += `
          <li>
          <img loading="lazy" src="${item.image !== undefined ? item.image : ""}">
          <h3>${item.title_short !== undefined ? item.title_short : ""}</h3>
          <h2>${item.title !== undefined ? item.title : ""}</h2>
          <p>${item.description !== undefined ? item.description : ""}</p>
          <p><a href=""><span class="learn-more">Learn more</span></a></p>
          </li>
          `
          this.$atelierOnHomePage.innerHTML += tempStr
        });
        this.artJsonFile.slice(4, 9).map(item => {
          let tempStr = '';
          tempStr += `
          <li><img  loading="lazy" data-src="media/images/${item.images[0]}"></li>`
          this.$footerGalery.innerHTML += tempStr
        });
      };
    },
    createHTMLforArtAndExhibitionsHeader(){
      let tempStrForYears = '';
         years.map(year => {
        tempStrForYears += `<li><a href="#${year}">${year}</a></li>`
      })
      this.$artAndExhYearsList.innerHTML = tempStrForYears
      let tempStrForCats = '';
      categories.map(cat => {
      tempStrForCats += `<li><a href="#">${cat}<a></li>`
      })
      this.$artAndExhCategoriesList.innerHTML = tempStrForCats
    }
  }
  app.initialize();
})();