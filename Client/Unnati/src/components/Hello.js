import React from 'react'

const Greet = (props) => {
    console.log(props)
    return(
    <div>
     {props.name} {props.heroName}
    {props.children}
    <h3>personal details</h3>
    <form name="personal details" action="#">
        <table border="2px" width="100%" cellspacing="0">
            <tr>
              <td>
                First name
                <br />
                <input type="text" placeholder="first name only" />
                <br />
                Last name
                <br />
                <input type="text" placeholder="Last name only" />
                <br />
                Date of birth<br />
                <input type="date" />
                <br />
                email<br />
                <input type="email" placeholder="abcd@gmail.com" />
                <br />
                URL<br />
                <input type="url" placeholder="http//mysit.com" />
                <br />
                Telephone<br />
                <input type="tel" placeholder="eg . 9911882233" />
                <br />
                Shoesize<br />
                <input type="number" placeholder="eg. 5" />
                <br />
                Flying skill level(1 low- 100 high)<br />
                <input type="range"/>
                <br />
              </td>
            </tr>
        </table>
    </form>

    </div>


   ) 
}
export default Greet