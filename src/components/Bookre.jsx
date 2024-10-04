import React, {useState, useEffect} from 'react'

const Bookre = () => {
    // const [data, setData] = useState([{}])
    // useEffect(()=>{
    //     fetch("/members").then(
    //         res=> res.json()
    //     ).then(
    //         data => {
    //             setData(data)
    //             console.log(data);
    //         }
    //     )
    // })
    // useEffect(()=>{
    //     fetch("/book").then(
    //         res=>res.json()
    //     ).then(
    //         data =>{
    //             setData(data)
    //             console.log(data)
    //         }
    //     )
    // })
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const handleSubmit = async () => {
        // e.preventDefault(); // 기본 폼 제출 동작 방지
        // try {
        //     const res = await fetch('http://localhost:5000/book', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ query }), // 쿼리를 JSON으로 변환
        //     });

        //     const data = await res.json(); // JSON 응답 파싱
        //     setResponse(data.answer); // 응답에서 답변 추출
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };

    const [pageContent, setPageContent] = useState('');

    useEffect(() => {
        fetch('/book')
            .then(res => res.json())
            .then(data => {
                if (data.page_content) {
                    setPageContent(data.page_content);
                } else {
                    console.error("Error fetching docs:", data.error);
                }
            })
            .catch(error => console.error("Error:", error));
    }, []);
    console.log(pageContent)
    
  return (
    <div>
             <form onSubmit={handleSubmit}>
        <input type="text" style={{"backgroundColor": "grey"}} value={query}
                    onChange={(e) => setQuery(e.target.value)}></input>
                        <button type="submit">Submit</button>
                        </form>
       
        {(typeof pageContent === 'undefined') ? (
            <p>Loading...</p>
        ):(
            pageContent.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
            ))
            // pageContent
            // // <p>HI</p>
            
        )}
        <p>{response && <p>Response: {response}</p>} {/* 응답 표시 */}</p>
    </div>
  )
}

export default Bookre