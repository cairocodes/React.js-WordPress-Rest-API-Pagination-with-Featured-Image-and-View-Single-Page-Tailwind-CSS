import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const perPage = 3;

    useEffect(() => {
        let url = `http://localhost:8888/cairocoders/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage}&_embed`;
        axios.get(url).then((res) => {
            const { data, headers } = res;
            setTotalPages(Number(headers['x-wp-totalpages']));
            setPosts(data);
            //console.log("Headers", headers['x-wp-totalpages']);
        });
    }, [currentPage])
    //console.log('posts', posts);

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {posts.map((post, index) => (
          <div key={index} className="max-w-sm border border-gray-200 rounded-md shadow">
            <div className="relative aspect-video">
              <img src={post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}
                alt={post.title.rendered}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-t-md object-cover"/>
            </div>
            <div className="p-5">
              <h1>
                <a
                  href={`/posts/${post.slug}`}>
                  {post.title.rendered}
                </a>         
              </h1>
            </div>
          </div>
        ))}
      </div>
      { posts.length > 0 && (
        <div className='w-1/2 py-10 m-auto flex justify-between items-center align-middle flex-wrap gap-10'>
          <button className='btn-primary p-2 bg-blue-500 text-white text-lg rounded-lg hover:shadow-lg disabled:opacity-50'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
          Previous
          </button>

          <span className='text-lg'>{currentPage} of {totalPages}</span>

          <button className='btn-primary p-2 bg-blue-500 text-white text-lg rounded-lg hover:shadow-lg disabled:opacity-50'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
          Next
          </button>
        </div>
        )
      }
    </div>                          
 );
}