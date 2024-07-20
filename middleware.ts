import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
    '/home',
    '/classroom',
    '/chatset',
    '/performance',
    '/upcoming',
    '/recordings',
    '/meeting(,*)',
    '/chat(,*)',
    '/study-room',
])



export default clerkMiddleware((auth,req)=>{
    if(protectedRoutes(req))auth().protect();
    });
    
    export const config = {
      matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
    };