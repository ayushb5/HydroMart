function Gallery() {

    const images = [
        "/gallery/img1.png",
        "/gallery/img2.jpg",
        "/gallery/img3.jpg",
        "/gallery/img4.jpg",
        "/gallery/img5.png",
        "/gallery/img6.png",
        "/gallery/img7.jpeg",
        "/gallery/img8.jpeg",
        "/gallery/img9.png",
        "/gallery/img10.png",
        "/gallery/img11.png",
        "/gallery/img12.png",
        "/gallery/img13.png",
        "/gallery/img14.png",
        "/gallery/img15.png",
        "/gallery/img16.png"
    ]
    return (
        <>
            <div className="container">
                <h2 className="text-center mb-4">Gallery</h2>
                <div className="row">
                    {images.map((img, index) => {
                        return (
                            <div className='col-lg-3 col-md-3 col-sm-6 mb-4' key={index}>
                                <img src={img} alt='gallery' className='img-fluid rounded shadow gallery-img' />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Gallery