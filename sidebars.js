module.exports = {
  mySidebar: [
    'index',
    'release-notes',
    'overview',
    {
      type: 'category',
      label: 'Installation',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'installation/overview',
      },
      items: [
        'installation/installation',
        'installation/sap-gp-configuration',
        'installation/em-sapds-subtype',
        'installation/sm-sapds-subtype',
      ],
    },
    'configuration',
    {
      type: 'category',
      label: 'Reference Information',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'reference_information/overview',
      },
      items: [
        'reference_information/em-defining-a-job',
        'reference_information/sm-defining-a-job',
        'reference_information/logging-job-output',
      ],
    },
  ],
};
