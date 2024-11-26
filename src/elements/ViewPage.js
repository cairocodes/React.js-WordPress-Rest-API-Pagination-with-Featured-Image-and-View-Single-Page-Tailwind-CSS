import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Single = () => {
    const { slug } = useParams();
    const [post, setPost] = useState({});

    useEffect(()=>{
        // axios 
        let url = "http://localhost:8888/cairocoders/wp-json/wp/v2/posts?_embed&slug="+slug;
        axios.get(url).then(res => {
            console.log('res', res);
            //console.log(res.data[0].id);
            setPost(res.data);
        }).catch(err => {
            console.log('error:', err.message);
        });
    }, []);
    return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8">
            {
                post.length ? (
                <div>
                  <h1 className="text-2xl font-bold mb-5">{post[0].title.rendered}</h1>
                    <div className="mb-4">            
                      <div 
                        dangerouslySetInnerHTML={{ __html: post[0]['content']['rendered'] }}
                      />   
                    </div>
                </div>
                ) : ('Loading....')
            
            }
      </div>
    </div>
    )
}
export default Single;