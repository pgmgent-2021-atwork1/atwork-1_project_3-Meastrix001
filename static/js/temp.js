buildUIForArtsList(filterArts){
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const url = params.get('category');
  //console.log(url);

  let tempStr= '';
  //const listItemsArts = filterArts.find((art) => art.tags.index === url);
  // const listItemsArts = filterArts.map((art) =>{
  if(url !== null) {
    filterArts = filterArts.filter(art => art.tags.indexOf(url) > -1);
  }
  tempStr += filterArts.map( (art) => {
    console.log(art.title)
    this.$displayArts.innerHTML = `
      <li class="art__exhibitions">
        <div class="art__exhibitions--text">
          <h2 class="post__title font_smaller"><a href = "in-dialogue-with-calatrava/index.html">${art.title}</a></h2>
          <h3 class="padding--top--bottom">${art.subtitle}</h3>
          <h3 class="padding--top--bottom colour--grey">${art.tags ? art.tags  : ' '} <span>-</span> ${art.location ? art.location  : ' '}</h3>
        </div>
        <ul class="art__exhibitions--gallery">
           ${this.getArtistGallery(art.images)}
        </ul>
      </li>`
  }).join('');
  
  return tempStr;
}