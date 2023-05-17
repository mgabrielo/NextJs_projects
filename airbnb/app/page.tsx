// @ts-nocheck


import { Suspense, useEffect } from "react";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getCurrentUser from "./actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const listings = await getListings() || null
  const currentUser = await getCurrentUser();

  if( listings?.length == 0){
    return (
      <EmptyState showReset/>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Container>
      <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"> 
          { listings.map((listing:any)=>{
            return (
            
                <ListingCard currentUser={currentUser} key={listing.id} data ={listing}/>
              
            )
          })}
      </div>
    </Container>
    </Suspense>
  )
}
