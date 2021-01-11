(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.buildUI();
      this.fetchParameters();
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
      this.$pressListRelease = document.querySelector('.press-list-Release')
      this.$detailsPage = document.querySelector('.details')
      this.$detailsAbout = document.querySelector('.detail--about')
      this.$detailsGalery = document.querySelector('.detail--galery-list')
      this.$detailsRelatedList = document.querySelector('.detail--related-list')
      this.$detailsHeroImage = document.querySelector('.detail--about-hero')
      this.$atelierDetailsPage = document.querySelector('.visit-mons--about-hero')
      this.$pressDetailsPage = document.querySelector('.my-secret-garden-valencia--hero')
      this.$pressDetailsPageHeader = document.querySelector('.my-secret-garden-valencia--header')
      this.$pressDetailsPageAbout = document.querySelector('.my-secret-garden-valencia--about')
      this.$pressDetailsPageGallerylist = document.querySelector('.my-secret-garden-valencia--gallery-list')
      this.$pressDetailsDownloads = document.querySelector('.my-secret-garden-valencia--downloadables-list')
    },
    async buildUI() {
      if (this.$artAndExhHeader) {
        this.createHTMLforArtAndExhibitionsHeader()
      }
      if (this.$artAndExhlist || this.$artAndExhlistOnHomePage || this.$pressImagesList) {
        const artAPI = new ArtJson();
        const artJSON = await artAPI.createLineUpForArtJson();
        this.artJsonFile = artJSON
        this.createHTMLForArtLineUp(artJSON);
      }
      if (this.$atelierImagesList) {
        const AtelierJsonFile = new AtelierJson()
        const AtelierJSONFile = await AtelierJsonFile.createLineUpForAtelier();
        this.createHTMLfromJSON(AtelierJSONFile)
      }
      if (this.$atelierOnHomePage) {
        const AtelierJsonFileFromHome = new AtelierJsonHome()
        const AtelierJSONFileHome = await AtelierJsonFileFromHome.createLineUpForAtelierForHome()
        this.createHTMLforAtelierHome(AtelierJSONFileHome)
      }
      if (this.$pressImagesList) {
        const PressJsonFile = new PressJson();
        const PressJSONFile = await PressJsonFile.createLineUpForPressJson();
        this.createHTMLForPress(PressJSONFile)
      }
      if (this.$artAndExhlist) {
        this.artAndExhFilterValue = null
      this.$artAndExhCategoriesList.addEventListener('click', (ev) => {
        const filterValue = ev.target.dataset.id || ev.target.parentNode.dataset.id
        this.artAndExhFilterValue = filterValue
      })
      }
    },
    async fetchJSONS() {
      if (this.$detailsPage) {
        const artAPI = new ArtJson();
        const artJSON = await artAPI.createLineUpForArtJson();
        this.artJsonFile = artJSON
        this.createHTMLForArtLineUpDetailsPage(artJSON);
      } else if (this.$atelierDetailsPage) {
        const AtelierJsonFile = new AtelierJson()
        const AtelierJSONFile = await AtelierJsonFile.fetchJsonforDetails();
        this.createHTMLForAtelierDetails(AtelierJSONFile)
      } else if (this.$pressDetailsPage) {
        const PressJsonFile = new PressJson();
        const PressJSONFile = await PressJsonFile.fetchJsonforDetails();
        this.createHTMLForPressDetails(PressJSONFile)
      }
    },
    createHTMLForArtLineUpDetailsPage(data) {
      data.map(art => {
        let short_title = art.title.replace(/ /g, '-')
        // console.log(art.id)
        // console.log(this.URLIDParameter)
        if (short_title === this.URLparameter || art.id === this.URLIDParameter) {
          console.log(1)
          this.tags = art.tags.map(tag => {
            return tag
          }).join('')
          let imagesGalery = art.images.map(image => {
            return `<img src="../../media/images/${image}">`
          }).join('')
          this.$detailsHeroImage.innerHTML = `<img src="../../media/images/${art.images[0]}">`
          this.$detailsAbout.innerHTML = `
          <p>${art.location}</p>
          <h1>${art.title}</h1>
          <p>${art.description !== null ? art.description : ""}</p>
          <p>${this.tags !== null ? this.tags : art.this.tags}</p>
          `;
          this.$detailsGalery.innerHTML += `<li>${imagesGalery}</li>`;
          relatedItems = data.filter((u) => {
            return u.tags.indexOf(this.tags) > -1
          })
          if (relatedItems.lenght === undefined){
            console.log(2)
            this.$detailsRelatedList.innerHTML = `<li><h2>Geen gerelateerde items gevonden</h2></li>`
          } else {
            relatedItems.slice(2, 5).map(relatedItem => {
              let tempStr = '';
              console.log(relatedItem)
              tempStr += `
                <li>
                <a href="index.html?title=${relatedItem.title.replace(/ /g, '-')}">
                <img loading="lazy" src="../../media/images/${relatedItem.images[0]}">
                <p>${relatedItem.location}</p>
                <h2>${relatedItem.title !== undefined ? relatedItem.title : ""}</h2>
                <p>${relatedItem.description !== null ? relatedItem.description : ""}</p>
                <p><a href=""><span class="learn-more">Learn more</span></a></p>
                </a>
                </li>
                `
              this.$detailsRelatedList.innerHTML += tempStr
            })
          }
        }
      })
    },
    createHTMLForArtLineUp(data) {
      if (this.$artAndExhlist) {
        let mapArt = years.map(year => {
          const filterTroughArt = data.filter(art => {
            return art.year.indexOf(year) > -1;
          });
          console.log(filterTroughArt)
          let filterdArt = filterTroughArt.slice(0, 4).map(item => {
            let allImages = item.images.map((img, index) => {
              return `<img class="lazy" loading="lazy" src="../media/images/${img}" alt="...">`
            }).join('')
            this.artTitleParam = item.title.replace(/ /g, '-')
            return `
            <div class="art-exh--lineUp--block">
            <section class="art-exh--lineUp--inner">
            <a href="in-dialogue-with-calatrava/index.html?title=${this.artTitleParam}">
            <h3>${item.title !== null ? item.title : ""}</h3>
            <h4>${item.subtitle !== null ? item.subtitle : ""}</h4>
            <p>${item.location !== null ? item.location : ""}</p>
            </section>
            <section class="art-exh--lineUp--images">
            ${allImages}
            </a>
            </section>
            </div>`
          }).join('')
          return `
          <li>
          <h2 id="${year}">${year}</h2>
          ${filterdArt}
          </li>`
        }).join('')
        return this.$artAndExhlist.innerHTML = mapArt
      };
      if (this.$artAndExhlistOnHomePage) {
        let tempStr = "";
        let filterdObjects = data.filter(I => I.highlight === true)
        filterdObjects.map(art => {
          tempStr += `<li>
        <img  loading="lazy" src="media/images/${art.cover}">
        <p>${art.location !== null ? art.location : ''}</p>
        <h2>${art.title}</h2>
        <h3>${art.subtitle}</h3>
        </li>`
          return this.$artAndExhlistOnHomePage.innerHTML = tempStr
        })
      }
    },
    createHTMLfromJSON(data) {
      let tempStr
      data.map(item => {
        tempStr = `
          <li><a href="visiting-mons-again/index.html?id=${item.id}">
          <img src="../${item.image !== undefined ? item.image : ""}">
          <h3>${item.title_short !== undefined ? item.title_short : item}</h3>
          <h2>${item.title !== undefined ? item.title : item}</h2>
          <p>${item.description !== undefined ? item.description : item}</p>
          <p><span class="learn-more">Learn more</span></p>
          </a>
          </li>
          `
        this.$atelierImagesList.innerHTML += tempStr
      });
    },
    createHTMLforAtelierHome(data) {
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
    },
    createHTMLforArtAndExhibitionsHeader() {
      let tempStrForYears = '';
      years.map(year => {
        tempStrForYears += `<li><a href="#${year}">${year}</a></li>`
      })
      this.$artAndExhYearsList.innerHTML = tempStrForYears
      let tempStrForCats = '';
      categories.map(cat => {
        tempStrForCats += `<li data-id="${cat}"><a>${cat}<a></li>`
      })
      this.$artAndExhCategoriesList.innerHTML = tempStrForCats
    },
    createHTMLForPress(data) {
      data.map(item => {
        let tempStr = `
        <li>
        <a href="my-secret-garden-valencia/index.html?id=${item.id}">
        <img src="${item.image !== undefined ? item.image : ""}">
        <h3>${item.title_short !== undefined ? item.title_short : item}</h3>
        <h2>${item.title !== undefined ? item.title : item}</h2>
        <p>${item.description !== undefined ? item.description : item}</p>
        <p><span class="learn-more">Learn more</span></p>
        </a>
        </li>
        `
        if (item.type === "Press release") {
          return this.$pressListRelease.innerHTML += tempStr
        } else if (item.type === "In the press") {
          return this.$pressListIn.innerHTML += tempStr
        };
      });
    },
    createHTMLForAtelierDetails(data) {
      data.map(art => {
        console.log(art.id)
        console.log(this.URLIDParameter)
        if (art.id === this.URLIDParameter) {
          let imagesGalery = art.gallery.map(image => {
            return `<img src="../../media/images/${image}">`
          }).join('')
          this.$detailsHeroImage.innerHTML = `<img src="../../${art.image}">`
          this.$detailsAbout.innerHTML = `
             <p>${art.location}</p>
             <h1>${art.title}</h1>
             <p>${art.description !== null ? art.description : ""}</p>
             <p>${this.tags !== null ? this.tags : art.this.tags}</p>
             `;
          this.$detailsGalery.innerHTML += `<li>${imagesGalery}</li>`;
          data.slice(2, 5).map(item => {
            let tempStr = '';
            tempStr += `
              <li>
              <a href="index.html?id=${item.id}">
              <img loading="lazy" src="../../${item.image}">
              <p>${item.title_short}</p>
              <h2>${item.title !== undefined ? item.title : ""}</h2>
              <p>${item.description !== null ? item.description : ""}</p>
              <p><a href=""><span class="learn-more">Learn more</span></a></p>
              </a>
              </li>
              `
            this.$detailsRelatedList.innerHTML += tempStr
          })
        }
      })
    },
    createHTMLForPressDetails(data) {
      data.map(item =>{
        console.log(item)
        if (item.id === this.URLIDParameter) {
          tempStr = `<li class="download-button"><a href="${item.pdf !== null ? item.pdf : ''}" download><p>download pdf</p></a></li>`
          tempStr += `<li class="download-button"><a href="${item.docx !== null ? item.docx : ""}" download><p>download docx</p></a></li>`
          tempStr += `<li class="download-button"><a href="${item.zipFile !== null ? item.zipFile : ""}" download><p>download zipFile</p></a></li>`

          this.$pressDetailsDownloads.innerHTML = `${tempStr}`
          this.$pressDetailsPageHeader.innerHTML =`
          <p> Arne Quinze ${item.type}<p>
          <h1>${item.title}</h1>
          <p>${item.description}</p>
          `
          let images = item.gallery.map(image=>{
            return `
            <li>
            <a href="../../media/images/${image}" download><img src="../../media/images/${image}">
            <p>Download Image</p>
            </a>
            </li>`
          }).join(' ')
          this.$pressDetailsPageGallerylist.innerHTML += `${images}` 
        }
      })
    },
    fetchParameters() {
      const searchURL = window.location.search
      const searchForParam = new URLSearchParams(searchURL)
      const getParam = searchForParam.get('title')
      const getID = searchForParam.get('id')
      this.URLparameter = getParam
      this.URLIDParameter = getID
      if (getParam || getID !== null) {
        this.fetchJSONS()
        console.log(`Parameter found: ${getParam || getID}`)
      }
    }
  }
  app.initialize();
})();