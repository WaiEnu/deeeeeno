// Requiring modules 
import { Application, Router,send } from "https://deno.land/x/oak/mod.ts";
import {viewEngine,engineFactory,adapterFactory} from "https://deno.land/x/view_engine/mod.ts";

// Initiate app
const app = new Application();
const router = new Router();

// Setting up boilerplate for view-engine
const ejsEngine = await engineFactory.getEjsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

// Allowing Static file to fetch from server
app.use(async (ctx,next) => {
 await send(ctx, ctx.request.url.pathname,{
  root: `${Deno.cwd()}/static`
   })
 next()
});

// Passing view-engine as middleware
app.use(viewEngine(oakAdapter,ejsEngine));

// Creating Routes
router.get("/",(ctx)=>{
  ctx.render('deno.ejs',{data: {msg:"Hello Deno"}})
});

// Adding middleware to require our router
app.use(router.routes());
app.use(router.allowedMethods());

// Making app to listen to port
console.log('http://localhost:8080/');
await app.listen({port:8080});

// deno run --allow-net --allow-read server.ts