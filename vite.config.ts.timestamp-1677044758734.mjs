// vite.config.ts
import { defineConfig } from "file:///C:/Users/jasin/OneDrive/Git-Repository/OBSCommentBalloon/obsballoon/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jasin/OneDrive/Git-Repository/OBSCommentBalloon/obsballoon/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/jasin/OneDrive/Git-Repository/OBSCommentBalloon/obsballoon/node_modules/vite-plugin-svgr/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  base: "",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          configData: ["./config.json"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqYXNpblxcXFxPbmVEcml2ZVxcXFxHaXQtUmVwb3NpdG9yeVxcXFxPQlNDb21tZW50QmFsbG9vblxcXFxvYnNiYWxsb29uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqYXNpblxcXFxPbmVEcml2ZVxcXFxHaXQtUmVwb3NpdG9yeVxcXFxPQlNDb21tZW50QmFsbG9vblxcXFxvYnNiYWxsb29uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9qYXNpbi9PbmVEcml2ZS9HaXQtUmVwb3NpdG9yeS9PQlNDb21tZW50QmFsbG9vbi9vYnNiYWxsb29uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHN2Z3IoKV0sXG4gIGJhc2U6XCJcIixcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgY29uZmlnRGF0YTogWycuL2NvbmZpZy5qc29uJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVksU0FBUyxvQkFBb0I7QUFDdGEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFBQztBQUFBLEVBQ1IsTUFBSztBQUFBLEVBQ0wsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osWUFBWSxDQUFDLGVBQWU7QUFBQSxRQUM5QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
