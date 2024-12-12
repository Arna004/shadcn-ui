

export default function Home() {
  const ALL_PAGES = [
    { name: "Home Page", "path": "/Home" },
    { name: "login page", "path": "/login" },
    { name: "signup page", "path": "/signup" },
    { name: "dashboard page for admin", "path": "/admin" },
    { name: "dashboard page for truck admin", "path": "/truckadmin" },
    { name: "dashboard page for postmaster", "path": "/postmaster" },
    { name: "dashboard page for 3 PL client", "path": "/threePL" },
    { name: "dashboard page for client", "path": "/client" },
    { name: "vehicle addition", "path": "/addvehicle" },
    { name: "vehicle list", "path": "/viewvehicle" },
    { name: "threePL_parcel_list", "path": "/threePL_parcel" },
    { name: "parcel_details", "path": "/parcel_details" },
    { name: "viewallparcel", "path": "/viewallparcel" },
    { name: "API key input", "path": "/apikey" }
    
  ]


  return (
    <div className="container">
      <h1 className="text-5xl">Home Page</h1>
      <h2 className="text-3xl">All Pages</h2>

      <ol className="ms-3 text-xl">
        {
          ALL_PAGES.map((item, i) => {
            return (
              <li>
                <span>{i + 1}. </span>
                <a target="_blank" className=" underline text-blue-700" href={item.path}>{item.name}</a>
              </li>
            )
          })
        }

      </ol>

    </div>
  );
}
