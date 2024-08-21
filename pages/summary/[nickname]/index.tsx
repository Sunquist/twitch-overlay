import { NextPage } from "next"

export async function getServerSideProps({ params }: { params: { nickname: string } }) {
  const res = await fetch(`http://localhost:3000/api/summary/${params.nickname}`)
  const data = await res.json()
 
  return { props: { data, dt: Date.now() } }
}

type HomeProps = {
    data: Summary,
    dt: number
}

const Home: NextPage<HomeProps> = ({ data, dt }) => {

  return (
    <div>
      <script>
        {"setTimeout(function () { window.location.reload(true); }, 30000);"}
      </script>
      <div style={{color:"yellow"}}>{data.elo}</div>
    </div>
  );
}
export default Home
