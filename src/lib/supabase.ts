import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'


const supabase = createClientComponentClient()


export function dbServer(cookies:any){
    return createServerComponentClient({cookies})
}

export {supabase as db}