export default function Post(post) {
  console.log(post);
  const{comment, content, email, like, postId, title} = post.post;
  // console.log(imageId);
  return( 
    <div className="post">
    {/* <div className="postImage">
      <img
        src={'http://localhost:1050/'+imageId+'.jpg'}
        alt="Image Not Available :("
      />
    </div> */}
    <div className="texts">
      <h2>{title}</h2>
      <p className="info">
        <a href="/" className="info">
          {email}
        </a>
        <time>2023-01-06 16:45</time>
      </p>
      <p className="summary">
        {content}
      </p>
    </div>
  </div>
  )
}
