import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button, Loader, Segment, Dimmer } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaginShow extends Component {
  state = {
    pageLoader: false,
  };

  onRequest = async () => {
    this.setState({ pageLoader: true });
  };
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address); //pass the current address into the campaign function

    const summary = await campaign.methods.getSummary().call();

    return {
      miniumContribution: summary[0],
      balance: summary[1],
      requestsLength: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address,
    };
  }

  renderCard() {
    const {
      miniumContribution,
      balance,
      requestsLength,
      approversCount,
      manager,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address Of Campaign Manager",
        description: "The Campaign manager who created this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: miniumContribution,
        meta: "Minimum Contribution",
        description: "The least amount that can be donated",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Contract Balance",
        description: "Total Balance in the Campaign Contract",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Approvers Count",
        description: "Number of Approvals for fund release",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestsLength,
        meta: "Total Request",
        description: "Number of Requests",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Segment>
        <Dimmer active={this.state.pageLoader} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Layout>
          <h3>Campaign Information</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>{this.renderCard()}</Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address}></ContributeForm>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary onClick={this.onRequest}>
                      View Requests
                    </Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Layout>
      </Segment>
    );
  }
}

export default CampaginShow;
