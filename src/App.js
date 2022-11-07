import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./Components/Collection";

const cats=[
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]


function App() {
    const [categoryId, setCategoryId] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [collections, setCollections] = useState([]);

useEffect(()=>{
    fetch('https://636946e328cd16bba719c602.mockapi.io/photos').then(res=>res.json()).then(json=>{
        setCollections(json)
    }).catch(err=>{
        console.warn(err);
        alert('Ошибка при полученииданных')
    })
},[])

    return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {
                cats.map((item,index)=>{
                    return (
                      <li
                        onClick={()=>setCategoryId(index)}
                        className={categoryId===index? 'active' : ''}
                        key={item.name}>{item.name}
                      </li>)
                })
            }
        </ul>
        <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {collections.filter(obj=>{
              return obj.name.toLowerCase().includes(searchValue.toLowerCase())
          }).map((obj,index)=>(
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            ></Collection>
          ))}

      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
