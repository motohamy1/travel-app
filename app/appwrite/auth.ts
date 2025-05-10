import { ID, OAuthProvider, Query } from 'appwrite'
import { redirect } from 'react-router'
import{account, appwriteConfig, database} from '~/appwrite/client'

export const loginWithGoogle = async () => {
    try{
        account.createOAuth2Session(OAuthProvider.Google)
    }
    catch(e){ 
        console.log('loginWithGoogle',e)
    }
}

export const getUser = async () => {
    try{
        const user = await account.get()
        if(!user) return redirect('/sign-in');

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name','email', 'imageUrl', 'joinedAt', 'accountId'])
            ]
            
        )
    }
    catch(e){
        console.log(e)
    }
}

export const logoutUser = async () => {
    try{
        await account.deleteSession('current');
        return true;
    }
    catch(e){
        console.log('logoutUser error',e)
    }
}

export const getGooglePicture = async () => {
    try{
        const session = await account.getSession('current');
        if (!session || !session.providerAccessToken) {
            console.error('No active session or access token found');
            return null;
        }

        const accessToken = session.providerAccessToken;
        const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to fetch Google profile picture:', response.status, errorData);
            return null;
        }

        const data = await response.json();
        // Assuming the first photo is the primary one
        if (data.photos && data.photos.length > 0) {
            return data.photos[0].url;
        }
        return null; // No photo found
    }
    catch(e){
        console.error('Error in getGooglePicture:', e);
        return null;
    }
}

export const storeUserData = async () => {
    try{
        const user = await account.get();
        if(!user) return null;

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId',user.$id)]
        );
        if(documents.length > 0) return documents[0];
        const imageUrl= await getGooglePicture();

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                name: user.name,
                email: user.email,
                imageUrl: imageUrl,
                joinedAt: user.$createdAt,
            }
        );
        return newUser;
    }
    catch(e){
        console.log(e)
    }
}

export const getExistinguser = async () => {
    try{

    }
    catch(e){
        console.log(e)
    }
}