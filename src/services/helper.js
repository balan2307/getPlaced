export const successHandler = response => response;

export const errorHandler = error => {
    console.log( "Error handler",error);
    throw error;
}