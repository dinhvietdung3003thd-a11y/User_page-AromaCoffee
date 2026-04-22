import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthStore();

  if (!isLoggedIn || !user) {
    return (
      <main className="profile-page">
        <h1>Profile</h1>
        <p>Please login to view your profile.</p>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <h1>Profile</h1>

      <div className="profile-page__card">
        <div className="profile-page__avatar-wrap">
          <img alt="User avatar" className="profile-page__avatar" src={user.avatarUrl || '/placeholder-product.png'} />
        </div>
        <p>
          <strong>{user.displayName}</strong>
        </p>
        <p>{user.email}</p>

        <div className="profile-page__actions">
          <button onClick={() => navigate('/my-orders')} type="button">
            My Orders
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
