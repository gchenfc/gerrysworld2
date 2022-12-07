// This code reads my Simkl feed cached in DynamoDB and displays it on my website.
// See also: hourly_simkl.ts and fetch_simkl.ts.
var div = document.getElementById("simkl_feed");
var formatted_data = [];
fetch('/.netlify/functions/fetch_simkl')
  .then(response => response.json())
  .then(data => {
    function values(obj) { return Object.keys(obj).map((key) => obj[key]); }
    // Combine different types of entertainment (anime, shows, movies) & make metadata uniform
    for (var anime of values(data.simkl_data.S.anime).flat()) {
      anime['md'] = anime.show;
      formatted_data.push(anime);
    }
    for (var show of values(data.simkl_data.S.shows).flat()) {
      show['md'] = show.show;
      formatted_data.push(show);
    }
    for (var movie of values(data.simkl_data.S.movies).flat()) {
      movie['md'] = movie.movie;
      formatted_data.push(movie);
    }
    // Remove duplicates
    slugs = formatted_data.map((a) => a.md.ids.slug);
    formatted_data = formatted_data.filter(function (item, pos) {
      return slugs.indexOf(item.md.ids.slug) == pos;
    })

    // some convenience "aliases"
    for (var obj of formatted_data) {
      obj['date'] = obj.last_watched_at;
      if (obj.total_episodes_count == 0) {
        obj['progress'] = '100%';
      } else {
        obj['progress'] = `${obj.watched_episodes_count}/${obj.total_episodes_count}`;
      }
      obj['img_url'] = `https://simkl.in/posters/${obj.md.poster}_w.jpg`;
    }

    // Sort by date
    let formatted_data2 = formatted_data.filter((a) => a.date != null);
    formatted_data = formatted_data2;
    formatted_data.sort((a, b) => -a.date.localeCompare(b.date));
    console.log(formatted_data);

    // Create HTML
    create_elem = function (tag, cls, text) {
      var elem = document.createElement(tag);
      elem.classList.add(cls);
      elem.innerHTML = text;
      return elem;
    }
    for (var obj of formatted_data.slice(0, 10)) {
      // div.innerText += obj.date + "\n";
      var item = create_elem("div", "simkl_feed_item", "");
      // item.innerHTML += `<img src="${obj.img_url}" />`
      item.style.backgroundImage = `url("${obj.img_url}")`;
      item.appendChild(create_elem('p', 'progress', obj.progress));
      item.appendChild(create_elem('p', 'title', obj.md.title));
      const prog = eval(obj.progress.replace('%', '/100.0')) * 120;
      // const prog = 0.5 * 120;
      item.children[0].style.backgroundColor = `hsla(${prog}, 100%, 50%,0.6)`;
      // item.appendChild(create_elem('p', 'date', obj.date));
      div.appendChild(item);
    }
    div.appendChild(create_elem("p", "simkl_date_footer", "updated " + Date(data.FullDate.N)));
    div.appendChild(create_elem("p", "simkl_date_footer", 'Tracked via <a href="https://simkl.com/5517686/dashboard/">Simkl</a>'));
  });
