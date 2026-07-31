import UserNavbar from '../components/user/Navbar';
import Footer from '../components/user/Footer';

function UserLayout({children}) {
  return (
    <div className='flex flex-col min-h-screen'>
            <UserNavbar/>
            <main className='flex-1 bg-gray-50 overflow-x-hidden'>
                {children}
            </main>
            <Footer />
        </div>
  )
}

export default UserLayout
