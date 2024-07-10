import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Repositories from "../pages/repo/Repo";
import RepositoryDetails from "../pages/RepoDetails/RepoDetatils";
import Followers from "../pages/followers/Followers";
import Home from "../pages/home/Home";

const appRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: (
        <App />
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:username/repos",
        element: <Repositories />,
      },
      {
        path: "/:username/repos/:repoName",
        element: <RepositoryDetails />,
      },
      {
        path: "/:username/followers",
        element: <Followers />,
      },
    ],
  },
//   {
//     path: "/login",
//     element: <Login />,
//     children: [
//       {
//         path: "/login",
//         element: <LoginPart />,
//       },
//     ],
//   },
//   {
//     path: "/signup",
//     element: <Login />,
//     children: [
//       {
//         path: "/signup",
//         element: <SignupForm />,
//       },
//     ],
//   },
]);

export default appRouter;