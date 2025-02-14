import { rootPaths } from '~/constants/paths';
import { useAuthStore } from '~/store/useAuthStore';
import { Button } from '~/components/ui';

const Header = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <header className="p-6 mx-auto max-w-7xl">
      <nav className="flex items-center justify-between">
        <a href={rootPaths.index}>
          <img className="h-8 w-auto" src="/vite.svg" alt="icon" />
        </a>
        {user ? (
          <div className="flex gap-2 align-center">
            <span className="text-sm/6 font-semibold text-stone-50">
              Hi {user.name}
            </span>
            <Button onClick={logout}>Logout</Button>
          </div>
        ) : (
          <a href={rootPaths.login} className="text-sm/6 font-semibold text-stone-50 hover:text-stone-300">
            Login
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
