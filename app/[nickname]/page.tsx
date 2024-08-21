"use client"
 
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'


export default function Home({ params }: { params: { nickname: string } }) {
  const { data } = useSWR<Summary, Error>(`https://twitch-overlay-f815yt8vr-sunquists-projects.vercel.app/api/summary/${params.nickname}`, fetcher, { refreshInterval: 30000 });

  return (
     <div style={{display: "flex", alignItems: "center", background: "rgba(0,0,0,0.3)", padding: 4, borderRadius: 40, width: 165}}>
      {((data?.ranking || 0) < 1000)?
        <div style={{height: 36, display: "flex", alignItems: "center", backgroundColor: "rgb(232, 1, 40)", borderRadius: 40}}>
            <div style={{marginRight: 5, marginLeft: 5, fontSize: "1.2em"}}>#{data?.ranking} </div>
            <div style={{marginTop: 4, marginRight: 2}}>
              <svg viewBox="0 0 24 24" fill="#e80128" xmlns="http://www.w3.org/2000/svg" height="32" width="32" className="sc-klVQfs iUnkpp"><g clip-path="url(#clip0_7619_6076__WV4nRCHk)"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12" fill="#121212"></path><path d="M7.042 6.773a10 10 0 00-1.297-.375l-.008-.008c-.15-.442-.255-.885-.352-1.365a9.5 9.5 0 012.1-1.515 10 10 0 00-.023 1.41c.405.21.803.458 1.155.713-.57.307-1.102.69-1.575 1.14m11.213-.375c.15-.443.255-.885.353-1.365a9.5 9.5 0 00-2.1-1.515c.037.487.052.945.022 1.41-.405.21-.795.457-1.155.712a7 7 0 011.575 1.14c.413-.15.855-.285 1.297-.375zM20.85 8.28c-.27.39-.555.758-.87 1.103-.442-.09-.9-.15-1.343-.173a7.2 7.2 0 00-.99-1.672 9 9 0 011.343-.195c.21-.413.383-.84.54-1.298.54.683.982 1.433 1.32 2.235m-.487 4.53a11 11 0 001.237-.667 9.6 9.6 0 00-.308-2.573q-.482.529-1.02.968a9 9 0 00-1.304-.368c.165.63.24 1.283.232 1.935q.587.304 1.163.698zm.36 3.18a10 10 0 01-1.388.113 9 9 0 00-.788-1.11 7 7 0 00.555-1.86c.368.255.728.54 1.05.855a8 8 0 001.32-.48 9.3 9.3 0 01-.75 2.482zm-2.333 3.173c-.458-.12-.9-.278-1.328-.465v.007a8 8 0 00-.27-1.327c.503-.42.908-.938 1.268-1.478.247.39.427.78.615 1.208.45.052.937.104 1.402.09-.48.72-1.027 1.402-1.687 1.965M7.207 17.37a8 8 0 00-.27 1.328v-.008q-.641.284-1.327.465c-.66-.563-1.208-1.245-1.688-1.965.465.015.953-.03 1.403-.09.187-.428.367-.818.615-1.208.36.54.772 1.058 1.267 1.478m-2.535-1.267c.233-.39.51-.773.788-1.11a6.5 6.5 0 01-.555-1.86 8 8 0 00-1.05.855 9 9 0 01-1.32-.48c.12.862.39 1.695.75 2.482.477.067.925.112 1.387.113m.128-3.99c-.382.195-.772.435-1.162.697v.008A13 13 0 012.4 12.15a9.6 9.6 0 01.308-2.572q.482.529 1.02.967c.427-.157.87-.277 1.305-.367a7 7 0 00-.233 1.935m-.78-2.73c.442-.098.9-.15 1.342-.173a7.2 7.2 0 01.99-1.672 10 10 0 00-1.342-.195 10 10 0 01-.54-1.298A9.6 9.6 0 003.15 8.28c.27.398.555.765.87 1.103m9.02 11.536l1.345.52-.27.699L12 21.321l-2.115.817-.27-.7 1.345-.52L7.807 19.7l.27-.7L12 20.517 15.923 19l.27.7zm2.004-12.781c.033-.05.114-.033.114.033v6.76c0 .033-.098.082-.146.066-.663-.26-1.49-.588-2.391-.945a586 586 0 00-6.041-2.37c-.066-.032-.033-.131.048-.131h6.251c.379-.623.8-1.28 1.402-2.22z"></path></g></svg>
            </div>
        </div>
        :
        <div>
          <div>
            <img src={data?.image} height={32} />
          </div>
        </div>
      }
        <div style={{fontSize: "0.8em"}}>
          <div style={{color: "white", marginLeft: 5, display: "flex", alignItems: "center",}}>
            {data?.elo} ({(data?.eloDiff || 0) > 0 ? "+" : ""} {data?.eloDiff})
          </div>
          <div style={{marginLeft: 15}}>
            <span style={{color: "#63e6be"}}>{data?.wins}W</span> <span style={{color: "#efefef"}}>-</span> <span style={{color: "#ef5351"}}>{data?.losses}L</span>
          </div>
        </div>
     </div>
  );
}
