

const loadCategories = ()=>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
    .catch(error => console.log(error))
}


const displayCategories =(newsCategories)=>{
    const newsCategoriesContainer = document.getElementById('news-category');
    newsCategories.forEach(category =>{
        const div = document.createElement('div');
        div.classList.add('news-category')
        div.innerHTML =`
            <h4 onclick='targetNews(${category.category_id
            })'> ${category.category_name}</h4>
        `;
        newsCategoriesContainer.appendChild(div);
    })
}

 const  targetNews = async (id)=>{
     const res = await  fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
     const data = await res.json();
     const notFound =  document.getElementById('notFound');

     if(data.status === true){
        notFound.classList.add('d-none')
     }else{
        notFound.classList.add('d-block')
     }
    displayNews(data.data)
  
}
const displayNews =(allSews)=>{
    const newsContainer = document.getElementById('news-container');
document.getElementById('total-item').innerText = 'Total item found : '+ allSews.length;
    newsContainer.textContent = '';

    allSews.forEach(news=>{
    
        const newsDiv = document.createElement('div');
        const cha100 = news.details.slice(0,150);
        const cha200 = news.details.slice(151,300);
        const id = news._id;
        newsDiv.innerHTML =`
        <div class="col-sm-12 col-md-9 py-3">
        <div class="d-flex">
          <div class="col-sm-12 col-md-4" class="rounded">
            <img class="img-fluid" src=${news.thumbnail_url  } alt="">
          </div>
          <div class="w-75">
            <h3 onclick="displayDetails(${news._id})"  class="py-2">${news.title }</h3>
            <p class="">${cha100 }</p>
            <p class="details">${cha200 }</p>
           
            <div class="d-flex py-3 justify-content-around align-items-center">
              <div class="d-flex align-items-center">
                <img class="author-img" src=${news.author.img} alt="">
                <span>
                <p class="author-name ">${news.author.name }</p>
                <p>${news.author.published_date
                }</p>
                </span>
                                       
              </div>
              <p>Views:  ${news.total_view  } m</p>
           
              <p>Rating:  ${news.rating.number }</p>
              
              <button
              onclick="getModalButton(${id})"
              type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
              class="btn btn-primary"
             >
              details
             </button>

            </div>
          </div>
        </div>
      </div>
        
        `;
        newsContainer.appendChild(newsDiv);
        
    // modal area 
    news.title?getId('title').innerText = news.title: getId('title').innerText='Title not found';
    news.author.name?getId('modal-author').innerText= "Author :"+ news.author.name:getId('modal-author').innerText= 'Author name not available' ;

    news.total_view?getId('views').innerText= 'Total views :'+ news.total_view :getId('views').innerText = 'Views not found'; 

        
    });


   
}

/// modal function 


 



loadCategories();

// common function for get ID

const getId=(id)=>{
   const tag = document.getElementById(id);
   return tag;
}

//   type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"



// modal function 



  