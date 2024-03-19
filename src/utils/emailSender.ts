import { Resend } from "resend";
const emailSender=()=>
{
    const resend=new Resend('re_KEmK3uih_BMkYPJvR4BT62y6TTx61uVsA');
    resend.emails.send({
        from:'shivvis219@gmail.com',
        to:'shivamvish349@gmail.com',
        subject:'Hello World',
        html:'<h1>Hello how are you</h1>'
    });
}

export default emailSender;