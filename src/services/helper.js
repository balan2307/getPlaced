export const successHandler = response => response.data;

export const errorHandler = error => {
    console.log( "Error handler",error.message ,error);
    throw error;
}