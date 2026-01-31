import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import PlaceholdersAndVanishInputDemo from "./components/PlaceholdersAndVanishInputDemo.tsx";
import "./App.css";
import LearningPage from "./components/LearningPage.tsx";
import LandingPage from "./components/LandingPage.tsx";
import LoginPage from "./components/LoginPage.tsx";
import CourseSelectionPage from "./components/CourseSelectionPage.tsx";
import YearSelectionPage from "./components/YearSelectionPage.tsx";
import SubjectSelectionPage from "./components/SubjectSelectionPage.tsx";
import TopicSelectionPage from "./components/TopicSelectionPage.tsx";
import SettingsPage from "./components/SettingsPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/courses" element={<CourseSelectionPage />} />
      <Route path="/years" element={<YearSelectionPage />} />
      <Route path="/subjects" element={<SubjectSelectionPage />} />
      <Route path="/topics" element={<TopicSelectionPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/chat" element={<PlaceholdersAndVanishInputDemo />} />
      <Route path="/learning" element={<LearningPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
