# Getting Started

## Dependencies
> Just follow Getting Started guide on Frappe Framework
- Linux (Install Ubuntu or VirtualBox)
- Python 3.9 (Use Pyenv if you have multiple python versions)
- Bench CLI (Frappe Framework)
- MariaDB
- NodeJS

## New to Frappe?
### Easy Course
- https://frappe.school/courses/frappe-framework-tutorial
- 
### Documentation
- [Frappe Docs](https://frappeframework.com/docs/user/en)
- [Frappe Bench](https://frappeframework.com/docs/user/en/bench)
- [Frappe DocTypes](https://frappeframework.com/docs/v14/user/en/basics/doctypes)
- [Frappe React SDK](https://github.com/nikkothari22/frappe-react-sdk)
- [Frappe Types Generator](https://github.com/nikkothari22/frappe-types)

### Key Words to know
- Doctype: A document type. A table in the database. A model in the backend. A form in the frontend.
- Docfield: A field in a doctype. A column in the database. A property in the model. A prop in the component.
- Bench: A CLI tool for managing Frappe Framework apps and sites.
- App: A Frappe Framework app. A collection of doctypes, doctypes, and other files.
- Site: A Frappe Framework site. A collection of apps, and a database.

## Running the app
- Check your bench cli installation
	- `bench --version`
- `cd` into your frappe bench or start a new frappe bench
	- `bench init frappe-bench`
	- After this we can `cd` into the bench folder and start the server `cd frappe-bench`, and `bench start`. However, because the bench does not currently contain any sites, it will throw an error
- Get the app `bench get-app https://github.com/TechnocultureResearch/eln`
	- Install the app `./env/bin/pip install -q -U -e ./apps/eln`
	- Build the app `bench build --app eln`
- Create a new site `bench new-site eln.test`
	- Optional: Add hostname `bench --site eln.test add-to-hosts`. So we can visit `http://eln.test:8000/` instead of `http://127.0.0.1:8000/`
- Install our app onto the new site `bench --site eln.test install-app eln`
	- Check app is installed on our site `bench --site eln.test list-apps`. This should now include `eln`.
- Start the server `bench start`
- Visit the desk(Admin Pannel) `http://eln.test:8000/`
- Visit the website `http://eln.test:8000/eln`
