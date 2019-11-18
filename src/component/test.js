import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router';
import toJson from 'enzyme-to-json';

// import my components
import ListComponent from './List'
import ListContainer from './ListContainer'
import DetailsComponent from './Details'
import DetailsContainer from './DetailsContainer'
import NotFound from './NotFound'
import App from '../App';


const sample = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }]

global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
        resolve({
            ok: true,
            json: function () {
                return sample
            }
        })
    })
    return p
})

describe('Testing list container component', () => {
    it('API is fetched ok and setState works for ListContainer', () => {
        const wrapper = shallow(
            <ListContainer url="link.com" />
        ).dive();
        expect(wrapper.state('isLoaded')).toEqual(true);
    })

    it('Should call componentdidmount', () => {
        const spy = jest.spyOn(ListContainer.prototype, 'componentDidMount');
        let wrapper = mount(
            <ListContainer url="link.com" />
        );
        wrapper.update()
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('Should render correctly', () => {
        const wrapper = shallow(
            <ListContainer url="link.com" />
        ).dive();
        expect(toJson(wrapper)).toMatchSnapshot();
    })

    // testing sorting function
    it("Sorting function", () => {
        let wrapper = mount(
            <ListContainer url="link.com" />
        );
        let a = { name: 'Charles' }
        let b = { name: 'Jessie' }
        expect(wrapper.instance().compare(a, b)).toEqual(-1);
        expect(wrapper.instance().compare(b, a)).toEqual(1);
        expect(wrapper.instance().compare(b, b)).toEqual(0);
    })
})

describe('Testing list component', () => {
    let wrapper = mount(<ListComponent list={sample} />);

    // checking if setState works
    it("Mounting list component", () => {
        wrapper.update();
        expect(wrapper.state('isLoaded')).toEqual(true);
    })

    // when clicking on a name, should direct to detail page
    it("Checking if redirect", () => {
        wrapper.update();
        const link = wrapper.find("#name-1 .name-link").getDOMNode()
        expect(link.getAttribute('href')).toEqual("/users/1")
    })
})

describe('Testing details container component', () => {
    it('Should call componentdidmount', () => {
        const spy = jest.spyOn(DetailsContainer.prototype, 'componentDidMount');
        let wrapper = mount(
            <DetailsContainer url="link.com" />
        );
        wrapper.update()
        expect(spy).toHaveBeenCalledTimes(1);
    })
})

describe('Testing details component', () => {
    let wrapper = shallow(<DetailsComponent
        name={sample[0].name}
        username={sample[0].username}
        email={sample[0].email}
        address={sample[0].address}
        phone={sample[0].phone}
        website={sample[0].website}
        company={sample[0].company}
    />);

    // checking if name is rendered correctly on details
    it("Checking if redirect", () => {
        wrapper.update();
        const name = wrapper.find("Title").props().children
        expect(name).toEqual(sample[0].name)
    })
})

// testing routing
describe('Test navigation in router', () => {
    test('Invalid path', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/invalid']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(ListContainer)).toHaveLength(0);
        expect(wrapper.find(NotFound)).toHaveLength(1);
    });

    test('Valid path to details', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/users/1']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(DetailsContainer)).toHaveLength(1);
        expect(wrapper.find(NotFound)).toHaveLength(0);
    });

    test('Valid path to list', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(ListContainer)).toHaveLength(1);
        expect(wrapper.find(NotFound)).toHaveLength(0);
    });
})