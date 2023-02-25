from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in eln/__init__.py
from eln import __version__ as version

setup(
	name="eln",
	version=version,
	description="Electronic Lab Notebook",
	author="Technoculture Research",
	author_email="satyam@technoculture.io",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
